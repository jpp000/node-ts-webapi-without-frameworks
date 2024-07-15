import { PodcastTransferModel } from "../models/podcast-transfer-model"
import { repoPodcast } from "../repositories/podcast-repository"
import { StatusCode } from "../utils/status-code";

export const serviceListEpisodes = async (): Promise<PodcastTransferModel> => {
    
    let response: PodcastTransferModel = {
        statusCode: 0,
        body: []
    };
    
    const data = await repoPodcast()

    response.statusCode = data.length !== 0 ? StatusCode.OK : StatusCode.NoContent
    response.body = data

    return response
}