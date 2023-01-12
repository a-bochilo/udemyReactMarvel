import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=6392eddb89ddb5d9d6ce73f1308ec5e7";
    const _baseCharacterOffset = 210;
    const _baseComicsOffset = 21000;

    const getAllCharacters = async (offset = 0) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${
                _baseCharacterOffset + offset
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

    const getAllComics = async (offset = 0) => {
        const res = await request(
            `${_apiBase}comics?limit=8&offset=${
                _baseComicsOffset + offset
            }&${_apiKey}`
        );
        return res.data.results.map(_transformComics);
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            pageCount: comics.pageCount,
            price: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            homepage: comics.urls[0].url,
            language: comics.textObjects[0].language,
        };
    };

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
    };
};

export default useMarvelService;
