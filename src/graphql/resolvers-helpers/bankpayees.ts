import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Payees } from "../../entity/payees";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fetch from "node-fetch";

export const payeesResolvers = {
  Mutation: {
    getBankBookImage: async (
      _: any,
      arg: { id: number }
    ): Promise<{ response: String } | undefined> => {
      let payee;
      try {
        payee = await Payees.findOneBy({ id: arg.id });
      } catch (error) {
        throw new GraphQLError("User not found for the provided id", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
      const s3 = new S3Client({
        region: process.env.AWS_REGION
      });

      const bucketParams = {
        Bucket: process.env.S3_BUCKET,
        Key: process.env.S3_DIR + payee.book_image,
      };

      try {
        const command = new GetObjectCommand(bucketParams);
        const signedUrl = await getSignedUrl(s3, command, {
          expiresIn: 30,
        });

        return { response: signedUrl };
      } catch (err) {
        return { response: "Could not fetch image." };
      }
    },
    approveBankBook: async (
      _: any,
      arg: { id: number }
    ): Promise<{ response: Boolean } | undefined> => {
      try {
        const payee = await Payees.findOneBy({ id: arg.id });
        payee.active = true;
        payee.updated_at = new Date();
        if (await Payees.save(payee)) {
          return { response: true };
        }
        return { response: false };
      } catch (error: any) {
        throw new GraphQLError("User approval failed", {
          extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
        });
      }
    },
    rejectBankBook: async (
      _: any,
      arg: { id: number }
    ): Promise<{ response: Boolean } | undefined> => {
      try {
        const payee = await Payees.findOneBy({ id: arg.id });
        payee.account_name = null;
        payee.account_number = null;
        payee.routing_number = null;
        payee.book_image = null;
        payee.active = false;
        payee.updated_at = new Date();
        if (await Payees.save(payee)) {
          return { response: true };
        }
        return null;
      } catch (error) {
        throw new GraphQLError("User rejection failed", {
          extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
        });
      }
    },
  },
  Query: {
    getNewBankBooks: async (_: any, arg: Payees) => {
      try {
        return await Payees.find();
      } catch (error) {
        throw new GraphQLError("Could not fetch data.", {
          extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
        });
      }
    },
  },
};
