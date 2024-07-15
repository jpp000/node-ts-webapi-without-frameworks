import fs from "fs";
import path from "path";
import { Podcast } from "../models/podcast-model";

const pathData = path.join(__dirname, '../repositories/podcasts.json')

export const repoPodcast = async ( podcastName?: string ): Promise<Podcast[]> => {
    const rawData = fs.readFileSync(pathData, 'utf-8')
    let jsonFile = JSON.parse(rawData)

    if(podcastName){
        jsonFile = jsonFile.filter((podcast: Podcast) => podcast.podcastName === podcastName)
    }

    return jsonFile
}