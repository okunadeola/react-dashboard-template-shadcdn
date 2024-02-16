/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import './index.scss'


// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'

import { fetchEvents, selectEvent, updateEvent, updateFilter, updateAllFilters, addEvent, removeEvent } from './store'
import { cn } from '../../lib/utils'
import Calendar2 from './Calendar2'


// ** CalendarColors
const calendarsColor = {
    Business: 'blue',
    Holiday: 'green',
    Personal: 'red',
    Family: 'yellow',
    ETC: 'purple'
  }



  const CalendarComponent = ()=>{
    // ** Variables
    const dispatch = useDispatch()
    const store = useSelector(state => state.calendar)
    console.log(store)




  // ** states
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)

    // ** AddEventSidebar Toggle Function
    const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

    // ** LeftSidebar Toggle Function
    const toggleSidebar = val => setLeftSidebarOpen(val)

  // ** Blank Event Object
  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  }
    // ** refetchEvents
    const refetchEvents = () => {
        if (calendarApi !== null) {
          calendarApi.refetchEvents()
        }
      }

        // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars))
  }, [dispatch, store.selectedCalendars])

    return (
        <Fragment>
        {/* <div className='app-calendar overflow-hidden border'>
          <div className='flex'>
            <div
              id='app-calendar-sidebar'
              className={cn(
                leftSidebarOpen  && 'flex-grow-0 overflow-hidden flex flex-col'
              )}
            >
              <SidebarLeft
                store={store}
                dispatch={dispatch}
                updateFilter={updateFilter}
                toggleSidebar={toggleSidebar}
                updateAllFilters={updateAllFilters}
                handleAddEventSidebar={handleAddEventSidebar}
              />
            </div>
            <div className='position-relative'>
              <Calendar
                store={store}
                dispatch={dispatch}
                blankEvent={blankEvent}
                calendarApi={calendarApi}
                selectEvent={selectEvent}
                updateEvent={updateEvent}
                toggleSidebar={toggleSidebar}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                handleAddEventSidebar={handleAddEventSidebar}
              />
            </div>
            <div
              className={cn(leftSidebarOpen && 'body-content-overlay')}
              onClick={() => toggleSidebar(false)}
            ></div>
          </div>
        </div> */}
        {/* <AddEventSidebar
          store={store}
          dispatch={dispatch}
          addEvent={addEvent}
          open={addSidebarOpen}
          selectEvent={selectEvent}
          updateEvent={updateEvent}
          removeEvent={removeEvent}
          calendarApi={calendarApi}
          refetchEvents={refetchEvents}
          calendarsColor={calendarsColor}
          handleAddEventSidebar={handleAddEventSidebar}
        /> */}

        <div>
          <div><span>calendar API</span></div>
          <Calendar2/>
        </div>
      </Fragment>
    )
  }

  export default CalendarComponent