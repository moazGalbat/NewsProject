

const subscribe = async (req, res, next) => {
    try {
        const { sources } = req.body;
        const user = req.user;
        user.sources = sources;
        await user.save()
        res.status(200).json(user.sources)
    } catch (error) {
        next(error)   
    }
}

const getUserSources = async (req, res, next) => {
    try {
        const { params: { id } } = req
        const user = req.user;
        res.status(200).json(user.sources)
    } catch (error) {
        next(error)   
    }
}


module.exports ={
    subscribe,
    getUserSources
}