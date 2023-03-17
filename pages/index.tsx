import FloatingButton from "@/components/FloatingButton/FloatingButton";
import Note from "@/models/Note";
import NoteComp from "@/components/Note/Note";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateNoteForm from "../components/Forms/CreateNote/CreateNoteForm";
import dbConnect from "@/lib/dbConnect";

const Home = ({ notes }: any) => {
  return (
    <Layout title="Escribe notas, tareas, etc.">
      <div className="notes grid gap-4">
        {notes.length > 0 ? (
          notes.map((element: any) => (
            <NoteComp key={element._id} {...element} />
          ))
        ) : (
          <div className="card bg-primary cursor-help">
            <div className="card-body">
              <h1 className="text-white">Aún no hay notas creadas</h1>
            </div>
          </div>
        )}
      </div>
      <FloatingButton>
        <CreateNoteForm />
      </FloatingButton>
    </Layout>
  );
};

export async function getServerSideProps({ query, res }: any) {
  let { q } = query;
  try {
    console.log(q);
    await dbConnect();
    let notes = await Note.find(
      q
        ? {
            $or: [
              {
                title: {
                  $regex: ".*" + q + ".*",
                  $options: "i",
                },
              },
            ],
          }
        : {}
    );

    console.log(notes);

    const notesFiltered = notes
      .map((doc: any) => {
        const note = doc.toObject();
        note._id = `${doc._id}`;
        return note;
      })
      .reverse();
    console.log("NOOOO 1", notesFiltered);
    return {
      props: {
        notes: notesFiltered,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}
export default Home;
