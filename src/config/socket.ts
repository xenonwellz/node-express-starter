import {NextFunction, Request, Response} from "express";
import {io} from "socket.io-client"
import env from "./env";

export class SocketClient {

    initializeSocket(token: string) {
        return io(`http://127.0.0.1:${env.get("SOCKET_PORT")}`, {auth: {token}});
    }

    emitEvent(req: any, roomId: string, eventName: string, eventData: any) {
        console.log(req.socket.io);
        req.socket.to(roomId).emit(eventName, eventData);
    }

}

const socket = (req: Request, res: Response, next: NextFunction) => {
    const tokenBearer = req.headers?.authorization;
    let token;
    if (tokenBearer !== undefined)
        token = req.get("x-access-token") || tokenBearer.split(" ")[1];
    else token = "";

    res.locals.socket = new SocketClient().initializeSocket(token);
    next();
}

export default socket;