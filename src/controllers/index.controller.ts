import { Request, Response, Body } from "https://deno.land/x/oak/mod.ts";
import uniq from "https://deno.land/x/vuniq/mod.ts";
import Users from "../config/database.ts";
import User from "../models/user.interface.ts";

let dataUser: User[] = Users;

function getIndex({ response }: { response: Response }) {
  response.body = "API WITH DENO!";
}

function getUsers({ response }: { response: Response }) {
  response.body = {
    message: "successfull query",
    dataUser,
  };
}

async function crateUsers({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) {
  const data: Body = await request.body();
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "content is required",
    };
  } else {
    const newUser: User = data.value;
    newUser.id = uniq();
    dataUser.push(newUser);
    response.status = 200;
    response.body = {
      message: "new user added",
      data: newUser,
    };
  }
}

async function updateUsers({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: Request;
  response: Response;
}) {

  const userFound = dataUser.find(user => user.id === params.id)
  if (!userFound) {
    response.status =404;
    response.body ={
      message: "User Not Found"
    }
  } else {
      const data : Body = await request.body();
      const updateUser = data.value;
      dataUser = dataUser.map( (user) =>  user.id === params.id ? {...user,...updateUser}: user);
      response.status = 200;
      response.body = {
        message : "User Updated successfully",
        dataUser
      }
  }


}

function getUser({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) {
  const foundUser: User = dataUser.find((user) => user.id === params.id);
  if (foundUser) {
    response.status = 200;
    response.body = {
      message: "Success",
      foundUser,
    };
  } else {
    response.status = 404;
    response.body = {
      message: "User not found",
    };
  }
}

function deleteUser({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) {
  dataUser = dataUser.filter((user) => user.id !== params.id);
  response.status = 200;
  response.body = {
    message: "User deleted",
  };
}

export { getUser, getUsers, crateUsers, updateUsers, deleteUser, getIndex };
