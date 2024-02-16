/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// ** React Import
import { useEffect, useRef, memo, useState } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Components
import toast from 'react-hot-toast'
// import { Menu } from 'react-feather'
// import { Card, CardBody } from 'reactstrap'
import { MenuIcon } from 'lucide-react'




const Calendar = props => {
  // ** Refs
  const calendarRef = useRef(null)
  const [mount, setmount] = useState(false)

  
    // ** Props
    const {
      store,
      dispatch,
      calendarsColor,
      calendarApi,
      setCalendarApi,
      handleAddEventSidebar,
      blankEvent,
      toggleSidebar,
      selectEvent,
      updateEvent
    } = props


  useEffect(() => {
    setmount(true)
  }, [])

  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi === null) {


      setTimeout(() => {
        console.log(calendarRef.current)
        let calendarApi = calendarRef?.current?.getApi()
        setCalendarApi(calendarApi)
        
      }, 10000);


    }
  }, [])




  // ** calendarOptions(Props)
  const calendarOptions = {
    events: store.events?.length ? store.events : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

      return [
        // Background Color
        `bg-${colorName}-200`
      ]
    },

    eventClick({ event: clickedEvent }) {
      dispatch(selectEvent(clickedEvent))
      handleAddEventSidebar()

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) 
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <MenuIcon className='xl:hidden block' />,
        click() {
          toggleSidebar(true)
        }
      }
    },

    dateClick(info) {
      const ev = blankEvent
      ev.start = info.date
      ev.end = info.date
      dispatch(selectEvent(ev))
      handleAddEventSidebar()
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent))
      toast.success('Event Updated')
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent))
      toast.success('Event Updated')
    },

    ref: calendarRef,

    // Get direction from app state (store)
    // direction: isRtl ? 'rtl' : 'ltr'
  }


  if (!mount) {
    return null
  }

  return (
    <div className='shadow-none border-0 mb-0 rounded-none p-3'>
      {/* <div className='pb-0'>
        <FullCalendar {...calendarOptions} ref={calendarRef} />{' '}
      </div> */}
      <FullCalendar
          ref={calendarRef}

        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: 'event 1', date: '2023-11-01' },
          { title: 'event 2', date: '2023-11-02' }
        ]}
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}


        headerToolbar={{
          start: 'sidebarToggle, prev,next, title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        }}

        editable={ true}
        eventResizableFromStart={true}
        dragScroll={true}
        dayMaxEvents={2}
        navLinks={true}

        eventClassNames={
          ({ event: calendarEvent })=>{
            // eslint-disable-next-line no-underscore-dangle
            const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
      
            return [
              // Background Color
              `bg-${colorName}-200`
            ]
          }
        } 
        
      />

    </div>
  )
}

export default memo(Calendar)
