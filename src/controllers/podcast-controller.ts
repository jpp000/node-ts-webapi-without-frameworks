import { IncomingMessage, ServerResponse } from "http";
import { serviceListEpisodes } from "../services/list-episodes";
import { serviceFilterEpisodes } from "../services/filter-episodes";
import { ContentType } from "../utils/content-type";
import { PodcastTransferModel } from "../models/podcast-transfer-model";

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
