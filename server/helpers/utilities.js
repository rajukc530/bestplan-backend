function parseUrlQuery(queryString) {
    const query = {};
    let i = 0;
    while (queryString[i] === '?' || queryString[i] === '/') {
        i++;
    }
    const pairs = queryString.substr(i).split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

export default {
    parseUrlQuery,
};
