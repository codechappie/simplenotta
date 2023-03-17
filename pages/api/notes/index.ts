import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();
  const { method } = req;
  const { q } = req.query;
  switch (method) {
    case "GET":
      try {
        let notes;
        if (q) {
          notes = await Note.find({
            title: {
              $regex: ".*" + q + ".*",
              $options: "i",
            },
          });
        } else {
          notes = await Note.find({});
        }
        return res.status(200).json({ success: true, notes });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error no hay cursos" });
      }
    case "DELETE":
      console.log("DELETE", req.body);
      try {
        let { id } = req.body;
        if (id) {
          await Note.findOneAndDelete({ _id: id });
        }
        return res.status(200).json({ success: true, id });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error no hay cursos" });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Error en el servidor" });
  }
}
