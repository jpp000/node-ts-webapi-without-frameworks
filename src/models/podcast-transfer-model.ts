import { Podcast } from "./podcast-model"

export interface PodcastTransferModel{
    statusCode: number,
    body: Podcast[]
}