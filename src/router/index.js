import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/notes/NotesView.vue'
import AddNoteView from '../views/notes/AddNoteView.vue'
import CalendarView from '../views/calendar/CalendarView.vue'

const routes = [
  {
    path: '/',
    name: 'NotesView',
    component: NotesView
  },
  {
    path: '/AddNote',
    name: 'AddNoteView',
    components: {
      NewNote:AddNoteView
    }
  },
  {
    path: '/Calendar',
    name: 'CalendarView',
    component: CalendarView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
