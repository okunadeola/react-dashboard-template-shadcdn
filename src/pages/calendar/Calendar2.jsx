/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import './calendar2.css'
import RightDrawer from './RightDrawer'


// ** CalendarColors
const calendarsColor = {
  Business: 'blue',
  Holiday: 'green',
  Personal: 'red',
  Family: 'yellow',
  ETC: 'purple'
}


const Calendar2 = () => {
  // ** states
    const [state, setState] = useState({
        weekendsVisible: true,
        currentEvents: []
      })
    const [openDrawer, setopenDrawer] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [calendarApi, setCalendarApi] = useState(null)
      


    
     const  handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
    
        calendarApi.unselect() // clear date selection
    
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
            
          })

          console.log(selectInfo.startStr, selectInfo.endStr, selectInfo.allDay, selectInfo)
        }
      }
    
      const handleEventClick = (info) => {
        let calendarApi = info.view.calendar
        console.log(calendarApi)
        console.log(info)
        const ev = info.event
    
        setCalendarApi(calendarApi)
        setSelectedEvent(ev) 
        setopenDrawer(true)

        // if (confirm(`Are you sure you want to delete the event '${info.event.title}'`)) {
        //   info.event.remove()
        // }
      }
    
     const  handleEvents = (events) => {
        setState({
            ...state,
          currentEvents: events
        })
      }
    
    
    
    function renderEventContent(eventInfo) {
    //   const options = {
    //     "Business":  { value: "Business", label: "Business", color: "blue" },
    //    "Personal" : { value: "Personal", label: "Personal", color: "red" },
    //    "Family": { value: "Family", label: "Family", color: "yellow" },
    //    "Holiday": { value: "Holiday", label: "Holiday", color: "green" },
    //    "ETC": { value: "ETC", label: "ETC", color: "purple" },
    //   };


    //  const color  = options[eventInfo.event.extendedProps.calendar].color 

    //  const classes =`bg-${color}-200 w-[100%] text-lg text-${color}-700`

    //  console.log(classes)

      return (
        
          <>
            <b >{eventInfo.timeText}</b>
              <i >{eventInfo.event.title}</i>
          
          </>
       
      )
    }


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

  const dateClickAction = (info)=>{
    let calendarApi = info.view.calendar
    console.log(calendarApi)
    console.log(info)
    const ev = blankEvent
    ev.start = info.start
    ev.end = info.end

    setCalendarApi(calendarApi)
    setSelectedEvent(ev) 
    setopenDrawer(true)
  }
    




  return (
    <div className='demo-app shadow-none border-0 mb-0 rounded-0 bg-gree '>
    <RenderSidebar data={state} changeState={setState}/>
    <div className='demo-app-main'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay, listMonth'
        }}
        
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        displayEventEnd={true}
        navLinks={true}
        eventResizableFromStart={true}
        dragScroll={true}
        dayMaxEvents={2}
        weekends={state.weekendsVisible}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        eventClassNames={({ event: calendarEvent})=>{
          // eslint-disable-next-line no-underscore-dangle
          const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
          console.log(colorName)
          return [
            // bg
            `bg-${colorName}-200`
            // `bg-light-green`
          ]
        }}
        // dateClick={dateClickAction}
    
        eventBackgroundColor='grey'
        select={dateClickAction}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventRemove={function(){}}
        */
          //    eventChange={handleEvents}
      />

    </div>

    <RightDrawer
      openDrawer={openDrawer} 
      setopenDrawer={setopenDrawer}
      selectedEvent={selectedEvent}
      calendarApi={calendarApi}
      calendarsColor={calendarsColor}
    />
  </div>
  )
}

export default Calendar2



















 function RenderSidebar({data, changeState}) {
    console.log(data)
    function renderSidebarEvent(event) {
        return (
          <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
          </li>
        )
      }

      
    const handleWeekendsToggle = () => {
        changeState({
            ...data,
            weekendsVisible: !data?.weekendsVisible
        })
        }

    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={data.weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({data?.currentEvents?.length})</h2>
          <ul>
            {data?.currentEvents?.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

