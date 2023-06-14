const express = require("express");
var user = require('../model/taskmodel')
const AVATAR_PATH = ("/uploads/user");
const fs = require("fs")
const path = require("path");
const imagepath = "uploads/user"

async function task(req, res) {
    try {
        console.log(req.file);
        console.log(req.body);
        var imagedata = path.join(imagepath, "/", req.file.filename)
        const newuser = new user({
            title: req.body.title,
            content: req.body.content,
            author:req.body.author,
            image: imagedata,

        })
        newuser.save()
        return res.send({
            message: "data submited !"
        })
    } catch (error) {
        console.log(error);
        return res.send({
            message: "something went wrong !"
        })
    }
}


async function user_list(req, res) {
    const alldata = await user.find({})
    if (alldata) {
        return res.send({
            data: alldata
        })
    }
    return res.send({
        message: "data not found"
    })

}


async function updatedata(req, res) {
    const updatedata = {
        title: req.body.title,
        content: req.body.content,
    }
    console.log(updatedata);
    const data = await user.findByIdAndUpdate(req.params.id, { $set: updatedata })
    if (data) {
        return res.send({
            message: "data updated succesfully"
        })
    }
    return res.send({
        message: "data not updated "
    })
}

// update  avatar

async function updateavatar(req, res) {

    //------------------------------------------------------ deleteavatar from folder
    console.log("----------------------");
    var findid = await user.findById(req.params.id,)
    fs.unlinkSync(findid.image)


    var imagedata = path.join(imagepath, "/", req.file.filename)

    const data = await user.findByIdAndUpdate(req.params.id, { image: imagedata })
    if (data) {
        return res.send({
            message: "image updated succesfully"
        })
    }
    return res.send({
        message: "image not updated"
    })
}





async function single_Record(req, res) {
    const finddata = await user.findById(req.params.id)
    if (finddata) {
        return res.send({
            message: "record show successfully",
            data: finddata
        });
    }
    else {
        return res.send({
            message: "data not found",
        });
    }

}


async function delete_Record(req, res) {
    const finddata = await user.findByIdAndDelete(req.params.id)
    if (finddata.image) {
        fs.unlinkSync(finddata.image)
    }
    return res.send({
        message: "record deleted successfully"
    });
}


module.exports = {
    task,
    user_list,
    single_Record,
    delete_Record,
    updatedata,
    updateavatar
    
}