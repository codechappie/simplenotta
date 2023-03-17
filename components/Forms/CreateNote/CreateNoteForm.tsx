import React from "react";
import axios from "axios";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "next/router";

const CreateNoteForm = () => {
  let [values, handleInputChange, reset] = useForm({
    title: "",
    description: "",
  });
  const router = useRouter();

  const { title, description }: any = values;
  const createNote = async () => {
    console.log(values);
    try {
      await axios.post("/api/notes/create", values).then(({ data }) => {
        if (data.success) {
          router.push("/", undefined, { shallow: false });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Crea una nueva nota</h3>
      <div className="py-4">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Título</span>
          </label>
          <input
            type="text"
            placeholder="Escribe un título"
            className="input input-bordered w-full"
            onChange={handleInputChange}
            value={title}
            name="title"
          />
        </div>
      </div>
      <div className="py-4">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Descripción</span>
          </label>
          <textarea
            className="textarea textarea-bordered "
            name="description"
            onChange={handleInputChange}
            value={description}
            placeholder="Escribe algo aquí"
          ></textarea>
        </div>
      </div>
      <div className="modal-action">
        <label htmlFor="my-modal-6" className="btn" onClick={createNote}>
          Crear
        </label>
      </div>
    </div>
  );
};

export default CreateNoteForm;
