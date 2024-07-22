import { IncomingMessage } from "http";
import { repoPodcast } from "../repositories/podcast-repository"
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { StatusCode } from "../utils/status-code";

export const serviceFilterEpisodes = async (url: IncomingMessage): Promise<PodcastTransferModel> => {
    const queryString = url.url?.split("?p=")[1] || '';
    const data = await repoPodcast(queryString)
    
    const response: PodcastTransferModel = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
        body: data
    }

    return response
}   