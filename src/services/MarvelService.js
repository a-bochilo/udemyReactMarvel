import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=6392eddb89ddb5d9d6ce73f1308ec5e7";
    const _baseOffset = 210;

    const getAllCharacters = async (offset = 0) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${
                _baseOffset + offset
            }&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description:
                character.description.length === 0
                    ? "Sorry, there is no data about the character"
                    : character.description,
            thumbnail:
                character.thumbnail.path + "." + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        };
    };

    return { loading, error, getAllCharacters, getCharacter };
};

export default useMarvelService;
