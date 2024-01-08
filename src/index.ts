import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

import notesController from '~/controllers/notes'
import { env } from '~/env'

const PORT = env.PORT

const app = new Elysia()

app.use(
  swagger({
    path: 'docs',
    exclude: [/docs/],
  }),
)

app.get('/', () => 'Hello Elysia')
app.use(notesController)

app.listen(PORT)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
