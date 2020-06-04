import { Request, Response, Body } from "https://deno.land/x/oak/mod.ts";
import uniq from "https://deno.land/x/vuniq/mod.ts";
import Users from "../config/database.ts";

function getIndex({ response }: { response: Response }) {
  response.body = "API WITH DENO!";
}

function getUsers({ response }: { response: Response }) {
  response.body = {
    message: "successfull query",
    Users,
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
      response.status =404;
      response.body = {
          message: "content is required"
      }
  } else {
    const newUser: User = data.value;
    newUser.id = uniq();
    Users.push(newUser);
    response.status = 200;
    response.body = {
      message: "new user added",
      data: newUser
    };
  }
}

function updateUsers() {}

function getUser() {}

function deleteUser() {}

export { getUser, getUsers, crateUsers, updateUsers, deleteUser, getIndex };
