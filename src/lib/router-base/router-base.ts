import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class RouterBase {
  static Create(route:PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>){
    console.log(typeof route.user)
  }
}
