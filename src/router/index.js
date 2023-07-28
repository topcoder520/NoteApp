import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/notes/NotesView.vue'
import AddNoteView from '../views/notes/AddNoteView.vue'
import ViewNoteView from '../views/notes/ViewNoteView.vue'
import CalendarView from '../views/calendar/CalendarView.vue'
import SettingView from '../views/setting/SettingView.vue'
import SearchView from '../views/search/SearchView.vue'
import CategoryView from '../views/category/CategoryView.vue'
import AddCategoryView from '../views/category/AddCategoryView.vue'

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
    path: '/ViewNote',
    name: 'ViewNoteView',
    components: {
      NewNote:ViewNoteView
    }
  },
  {
    path: '/Category',
    name: 'CategoryView',
    component: CategoryView
  },
  {
    path: '/AddCategory',
    name: 'AddCategory',
    components: {
      NewNote:AddCategoryView
    }
  },
  {
    path: '/Calendar',
    name: 'CalendarView',
    component: CalendarView
  },
  {
    path: '/Search',
    name: 'SearchView',
    components: {
      NewNote:SearchView
    }
  },
  {
    path: '/Setting',
    name: 'SettingView',
    component: SettingView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
