module.exports = (baseUrl)=>(req, res)=>{
    const siteUrl = new URL(req.url, baseUrl)
    req.pathname = siteUrl.pathname
    const params = {}
    siteUrl.searchParams.forEach((value, key)=>{
        params[key]=value
    })
    req.params = params
}