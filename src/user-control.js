const users = [
    {
        id:1,
        name: "Asadbek"
    },
    {
        id: 2,
        name: "AS-Groop"
    }
];

const getUsersControl = (req, res)=>{
    if(req.params.id) {
        return res.send(users.find((user)=>req.params.id==user.id))
    }
    res.send(users)
}

const postUsersControl = (req, res)=>{
    users.push(req.body)
    res.send(req.body)
}

module.exports = {
    getUsersControl,
    postUsersControl
}