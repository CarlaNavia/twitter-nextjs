import {useEffect, useState} from 'react'

import Button from 'components/Button'
import Avatar from 'components/Avatar'

import useUser from 'hooks/useUser'

import {addTweet, uploadImage} from 'firebase/client'

import {useRouter} from 'next/router'
import Head from 'next/head'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTweet() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        // Recuperar la URL del archivo de firebase. Devuelve una promesa con el estado actualizado y poder renderizarla
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      // Cuando cambie la tarea, se ejecutan los distintos métodos
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = event => {
    const {value} = event.target
    setMessage(value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addTweet({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL
    })
      .then(() => {
        router.push('/home')
      })
      .catch(err => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }
  // Arrastramos y entramos en el textarea
  const handleDragEnter = event => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  // Arrastramos y salimos
  const handleDragLeave = event => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }
  // Arrastramos y soltamos
  const handleDrop = event => {
    event.preventDefault()
    console.log(event)
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = event.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear un Tweet / Twitter</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
            value={message}
          ></textarea>
          {imgURL && (
            <section className="remove.img">
              <button onClick={() => setImgURL(null)}>X</button>
              <img src={imgURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Twittear</Button>
          </div>
        </form>
      </section>

      <style jsx>{`
        div {
          padding: 15px;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 999px;
          border: none;
          color: #fff;
          font-size: 24px;
          height: 32px;
          position: absolute;
          right: 15px;
          top: 15px;
          width: 33px;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .remove-img {
          position: relative;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        form {
          padding: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }

        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '3px  solid transparent'};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
