import { IncomingMessage, ServerResponse } from "http";
import { Podcast } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { StatusCode } from "../utils/status-code";
import { repoPodcast } from "../repositories/podcast-repository";
import fs from "fs";
import path from "path";

export const servicePostEpisode = async (req: IncomingMessage): Promise<PodcastTransferModel | string | undefined> => {
    const emptyRes: PodcastTransferModel = {
        statusCode: StatusCode.NoContent,
        body: []
    };

    if (!req) {
        return emptyRes;
    }

    const pathData = path.join(__dirname, '../repositories/podcasts.json')
    let podcast: Podcast[] = await repoPodcast();

    return new Promise((resolve, reject) => {
        let dataBuffer = '';

        req.on("data", (chunk) => {
            dataBuffer += chunk;
        });

        req.on("end", () => {
            try {
                const podcastData: Podcast = JSON.parse(dataBuffer);
                const { podcastName, episode, videoId, categories } = podcastData;

                if (!podcastName) {
                    resolve("Digite o nome do Podcast!");
                } else if (!episode) {
                    resolve("Digite o nome do episódio!");
                } else if (!videoId) {
                    resolve("Digite o Id do vídeo!");
                } else if (!categories) {
                    resolve("Digite as categorias do Podcast!");
                } else {
                    podcast.push(podcastData);
                    fs.writeFileSync(pathData, JSON.stringify(podcast, null, 2));
                    let response: PodcastTransferModel = {
                        statusCode: podcast.length !== 0 ? StatusCode.OK : StatusCode.NoContent,
                        body: podcast
                    };
                    resolve(response);
                }
            } catch (error) {
                reject(error);
            }
        });
    });
}