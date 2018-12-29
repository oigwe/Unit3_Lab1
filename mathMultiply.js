const math = {};



const getParams = function (url) {
    let params = {};
    let interroNum = url.indexOf('?');
    const interro =   url.slice(interroNum+1);
	const vars = interro.split('&');
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
    return params;
};

math.multiply = (url) => {
    let jsonObj = {
        input: {},
        productString: '',
        product: 1,
    };

    jsonObj['input'] = getParams(url);
    jsonObj['product'] = 1;
    jsonObj['productString']='';
    for(values in jsonObj['input']){
        if( !Number(jsonObj['input'][values])) {
            return {error: `You passed a non-number value into the parameters`};
        }
        jsonObj['product']*= Number(jsonObj['input'][values]);
        jsonObj['productString'] = Object.values(jsonObj['input']).join('*');           
    }
    return `${JSON.stringify(jsonObj)}`;
}


module.exports = math;