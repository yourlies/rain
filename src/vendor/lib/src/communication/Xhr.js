class Xhr {
    static fetch (url, options) {
        return fetch(url, options)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('get response fail');
        })
    }
}

export default Xhr;