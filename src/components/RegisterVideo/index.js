import React from 'react';
import { StyledRegisterVideo } from "./styles";
import { supabase } from '../../utils/supabase';

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (e) => {
      const value = e.target.value
      const name = e.target.name
      setValues({
        ...values,
        [name]: value,
      })
    },

    clearForm() {
      setValues({});
    }
  }
}

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
  const formCadastro = useForm({ 
    initialValues: {
      titulo: "", 
      url: ""
    }
   });
  const [formVisivel, setFormVisivel] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>

      {formVisivel
        ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              supabase.from("video").insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "jogos",
              })
              .then((result) => {
                console.log(result);
              })
              .catch((err) => {
                console.log(err);
              })

              setFormVisivel(false);
              formCadastro.clearForm();
            }}>
              <div>
                <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                  X
                </button>
                <input 
                  placeholder="Título do vídeo" 
                  name="titulo"
                  value={formCadastro.values.titulo} 
                  onChange={formCadastro.handleChange}
                />
                <input 
                  placeholder="URL" 
                  name="url"
                  value={formCadastro.values.url} 
                  onChange={formCadastro.handleChange}
                />
                <button type="submit">
                  Cadastrar
                </button>
              </div>
            </form>
          )
        :
          false
      }

    </StyledRegisterVideo>
  )
}