class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=6392eddb89ddb5d9d6ce73f1308ec5e7";
    _baseOffset = 210;

    getResourse = async (url) => {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Couldn't fetch ${url}, status: ${response.status}`
            );
        }

        return await response.json();
    };

    getAllCharacters = async (offset = 0) => {
        const res = await this.getResourse(
            `${this._apiBase}characters?limit=9&offset=${
                this._baseOffset + offset
            }&${this._apiKey}`
        );
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const res = await this.getResourse(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (character) => {
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
}

export default MarvelService;
