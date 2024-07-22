import { IncomingMessage, ServerResponse } from "http";
import { serviceListEpisodes } from "../services/list-episodes";
import { serviceFilterEpisodes } from "../services/filter-episodes";
import { ContentType } from "../utils/content-type";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { servicePostEpisode } from "../services/post-episode-service";
import { StatusCode } from "../utils/status-code";

export const getListEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
    const content: PodcastTransferModel = await serviceListEpisodes()

    res.writeHead(content.statusCode, { "Content-Type": ContentType.JSON });
    res.write(JSON.stringify(content.body))
    res.end()
}

export const getFilterEpisodes = async (req: IncomingMessage, res: ServerResponse) => {
    const content: PodcastTransferModel = await serviceFilterEpisodes(req)

    res.writeHead(content.statusCode, { "Content-Type": ContentType.JSON });
    res.write(JSON.stringify(content.body))
    res.end()
}


export const postEpisode = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const response: any = await servicePostEpisode(req);

        if (typeof response === 'string') {
            res.writeHead(StatusCode.BadRequest, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: response }));
        } else {
            res.writeHead(response.statusCode, { "Content-Type": "application/json" });
            res.write(JSON.stringify(response.body));
        }

        res.end();
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Internal Server Error" }));
        res.end();
    }
}