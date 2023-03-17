import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Note from "@/models/Note";
import getRandomColour from "@/hooks/useGetColour";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await dbConnect();

  const { method } = req;
  switch (method) {
    case "POST":
      let newNote = {
        ...req.body,
        colour: getRandomColour(),
      };

      console.log("POST", newNote);
      try {
        let note = new Note(newNote);

        await note.save();

        note._id = `${note._id}`;
        return res.status(200).json({ note, success: true, error: "" });
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, error: "Error al guardar" });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Error en el servidor" });
  }
}
