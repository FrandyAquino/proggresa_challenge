import { Request, Response } from 'express';
import axios from 'axios';
import { NEW_API_TOKEN } from '../config/enviroments';
import { Article } from '../interfaces/Article';
import { API_URL } from '../config/constants';

export const getArticles = async (req: Request, res: Response) => {
    const { topics, sources, q } = req.query;

    try {
        const queryParts: string[] = [];

        if (q) {
            queryParts.push(`${encodeURIComponent(q as string)}`);
        } else {
            if (topics) {
                const topicsArray = (topics as string).split(',').map(topic => topic.trim());
                queryParts.push(...topicsArray.map(topic => `+${encodeURIComponent(topic)}`));
            }

            if (sources) {
                const sourcesArray = (sources as string).split(',').map(source => source.trim());
                queryParts.push(`sources=${sourcesArray.join(',')}`);
            }
        }

        const query = queryParts.length > 0 ? queryParts.join(' ') : 'default'; 
        console.log(`Request URL: ${API_URL}everything?q=${encodeURIComponent(query)}&apiKey=${NEW_API_TOKEN}`);  // Agrega este log

        const response = await axios.get(
            `${API_URL}everything?q=${encodeURIComponent(query)}&apiKey=${NEW_API_TOKEN}`
        );
        
        const articles: Article[] = response.data.articles;
        res.json(articles);
    } catch (error: any) {
        console.error('Error fetching articles:', error.message);  // Este log ayudará a ver el error general
        // Responder con el código de error específico según la causa
        if (error.response) {
            // La respuesta del servidor externo
            console.error('Error response:', error.response.data);  // Detalles de la respuesta de la API externa
            res.status(error.response.status).json({ message: error.response.data.message });
        } else if (error.request) {
            // La solicitud no se completó
            console.error('Error request:', error.request);
            res.status(500).json({ message: 'No response from external API' });
        } else {
            // Otro tipo de error
            console.error('Error message:', error.message);
            res.status(500).json({ message: 'Failed to fetch articles' });
        }
    }
};
