/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Button, Drawer, Input } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import { useEffect } from 'react';
import img from "../../assets/images.jpeg";
import Select, { components } from "react-select"; // eslint-disable-line
import toast from "react-hot-toast";
import { isObjEmpty, selectThemeColors } from "../../../utils";
import { X } from "lucide-react";
import Flatpickr from "react-flatpickr";
// import 'react-flatpickr/node_modules/flatpickr'

import { createEventId } from "./event-utils";
// import "flatpickr/dist/themes/material_green.css";

const RightDrawer = ({
  openDrawer,
  setopenDrawer,
  selectedEvent,
  calendarsColor,
  calendarApi,
}) => {
  // ** States
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [guests, setGuests] = useState({});
  const [allDay, setAllDay] = useState(true);
  const [location, setLocation] = useState("");
  const [endPicker, setEndPicker] = useState(new Date());
  const [startPicker, setStartPicker] = useState(new Date());
  const [calendarLabel, setCalendarLabel] = useState([
    { value: "Business", label: "Business", color: "blue" },
  ]);

  const {
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "" },
  });

  // ** Select Options
  const options = [
    { value: "Business", label: "Business", color: "blue" },
    { value: "Personal", label: "Personal", color: "red" },
    { value: "Family", label: "Family", color: "yellow" },
    { value: "Holiday", label: "Holiday", color: "green" },
    { value: "ETC", label: "ETC", color: "purple" },
  ];

  const guestsOptions = [
    { value: "Donna Frank", label: "Donna Frank", avatar: img },
    { value: "Jane Foster", label: "Jane Foster", avatar: img },
    { value: "Gabrielle Robertson", label: "Gabrielle Robertson", avatar: img },
    { value: "Lori Spears", label: "Lori Spears", avatar: img },
    { value: "Sandy Vega", label: "Sandy Vega", avatar: img },
    { value: "Cheryl May", label: "Cheryl May", avatar: img },
  ];

  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`w-5 h-5 bg-${data.color}-500 text-sm mr-5`}></span>
        {data.label}
      </components.Option>
    );
  };

  const GuestsComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="flex flex-wrap items-center">
          <Avatar imageProps={data.avatar} />
          <div>{data.label}</div>
        </div>
      </components.Option>
    );
  };

  // ** Adds New Event
  const handleAddEvent = () => {
    const obj = {
      id: createEventId(),
      title: getValues("title"),
      start: startPicker,
      end: endPicker,
      allDay,
      //   display: 'block',
      extendedProps: {
        calendar: calendarLabel[0].label,
        url: url.length ? url : undefined,
        guests: guests.length ? guests : undefined,
        location: location.length ? location : undefined,
        desc: desc.length ? desc : undefined,
      },
    };
    calendarApi.addEvent(obj);
    toast.success("Event Added");
  };

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    setValue("title", "");
    setAllDay(false);
    setUrl("");
    setLocation("");
    setDesc("");
    setGuests({});
    setCalendarLabel([{ value: "Business", label: "Business", color: "blue" }]);
    setStartPicker(new Date());
    setEndPicker(new Date());
  };

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    const calendar = selectedEvent.extendedProps.calendar;

    const resolveLabel = () => {
      if (calendar.length) {
        return {
          label: calendar,
          value: calendar,
          color: calendarsColor[calendar],
        };
      } else {
        return { value: "Business", label: "Business", color: "blue" };
      }
    };

    setValue("title", selectedEvent.title || getValues("title"));
    setAllDay(selectedEvent.allDay || allDay);
    setUrl(selectedEvent.url || url);
    setLocation(selectedEvent.extendedProps.location || location);
    setDesc(selectedEvent.extendedProps.description || desc);
    setGuests(selectedEvent.extendedProps.guests || guests);
    setStartPicker(new Date(selectedEvent.start));
    setEndPicker(
      selectedEvent.allDay
        ? new Date(selectedEvent.start)
        : new Date(selectedEvent.end)
    );
    setCalendarLabel([resolveLabel()]);
  };

  // ** (UI) updateEventInCalendar
  const updateEventInCalendar = (
    updatedEventData,
    propsToUpdate,
    extendedPropsToUpdate
  ) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id);
    console.log("edit", existingEvent);

    // ** Set event properties except date related
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // ** dateRelatedProps => ['start', 'end', 'allDay']
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index];
      existingEvent.setProp(propName, updatedEventData[propName]);
    }

    // ** Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates

    console.log(updatedEventData.allDay)

    existingEvent.setDates(
      new Date(updatedEventData.start),
      new Date(updatedEventData.end),
      {
        allDay: updatedEventData.allDay,
      }
    );

    // ** Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index];
      existingEvent.setExtendedProp(
        propName,
        updatedEventData.extendedProps[propName]
      );
    }
  };


  //!!imprtant allday set to force work 
  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    if (getValues("title").length) {
      const eventToUpdate = {
        id: selectedEvent.id,
        title: getValues("title"),
        allDay,
        start: startPicker,
        end: endPicker,
        url,
        extendedProps: {
          location,
          description: desc,
          guests,
          calendar: calendarLabel[0].label,
        },
      };

      const propsToUpdate = ["id", "title", "url"];
      const extendedPropsToUpdate = [
        "calendar",
        "guests",
        "location",
        "description",
      ];

      updateEventInCalendar(
        eventToUpdate,
        propsToUpdate,
        extendedPropsToUpdate
      );
      closeDrawer();
      toast.success("Event Updated");
    } else {
      setError("title", {
        type: "manual",
      });
    }
  };

  // ** (UI) removeEventInCalendar
  const removeEventInCalendar = (eventId) => {
    calendarApi.getEventById(eventId).remove();
    closeDrawer();
  };

  const handleDeleteEvent = () => {
    removeEventInCalendar(selectedEvent.id);
    toast.error("Event Removed");
  };

  // ** Event Action buttons
  const EventActions = () => {
    if (
      isObjEmpty(selectedEvent) ||
      (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)
    ) {
      return (
        <Fragment>
          <Button className="me-1" variant="filled" type="submit" color="cyan">
            Add
          </Button>
          <Button
            color="secondary"
            type="red"
            onClick={closeDrawer}
            variant="outline"
          >
            Cancel
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button
            className="me-1"
            variant="filled"
            color="cyan"
            onClick={handleUpdateEvent}
          >
            Update
          </Button>
          <Button color="red" onClick={handleDeleteEvent} variant="outline">
            Delete
          </Button>
        </Fragment>
      );
    }
  };

  console.log(selectedEvent);

  const closeDrawer = () => {
    setopenDrawer(false);
  };
  // ** Close BTN
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={closeDrawer} />
  );

  useEffect(() => {
    if (selectedEvent) {
      handleSelectedEvent();
    }

    return () => {
      handleResetInputValues();
    };
  }, [selectedEvent]);

  return (
    <>
      <Drawer
        opened={openDrawer}
        position="right"
        size="md"
        onClose={closeDrawer}
        title={
          selectedEvent && selectedEvent?.title && selectedEvent?.title?.length
            ? "Update"
            : "Add"
        }
        Event
      >
        <form
          onSubmit={handleSubmit((data) => {
            if (data.title.length) {
              if (isObjEmpty(errors)) {
                if (
                  isObjEmpty(selectedEvent) ||
                  (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)
                ) {
                  handleAddEvent();
                } else {
                  handleUpdateEvent();
                }
                closeDrawer();
              }
            } else {
              setError("title", {
                type: "manual",
              });
            }
          })}
        >
          <div className="mb-1">
            <label className="form-label" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="Title"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="label">
              Label
            </label>
            <Select
              id="label"
              value={calendarLabel}
              options={options}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              onChange={(data) => setCalendarLabel([data])}
              components={{
                Option: OptionComponent,
              }}
            />
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="startDate">
              Start Date
            </label>
            <Flatpickr
              required
              id="startDate"
              name="startDate"
              className="form-control"
              onChange={(date) => setStartPicker(date[0])}
              value={startPicker}
              options={{
                enableTime: allDay === false,
                dateFormat: "Y-m-d H:i",
              }}
            />
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="endDate">
              End Date
            </label>
            <Flatpickr
              required
              id="endDate"
              // tag={Flatpickr}
              name="endDate"
              className="form-control"
              onChange={(date) => setEndPicker(date[0])}
              value={endPicker}
              options={{
                enableTime: allDay === false,
                dateFormat: "Y-m-d H:i",
              }}
            />
          </div>

          <div className="form-switch mb-1">
            <input
              id="allDay"
              type="checkbox"
              className="mx-3"
              checked={allDay}
              name="customSwitch"
              onChange={(e) => setAllDay(e.target.checked)}
            />
            <label className="form-label" htmlFor="allDay">
              All Day
            </label>
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="eventURL">
              Event URL
            </label>
            <Input
              type="url"
              id="eventURL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.google.com"
            />
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="guests">
              Guests
            </label>
            <Select
              isMulti
              id="guests"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={guestsOptions}
              theme={selectThemeColors}
              value={guests.length ? [...guests] : null}
              onChange={(data) => setGuests([...data])}
              components={{
                Option: GuestsComponent,
              }}
            />
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="location">
              Location
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Office"
            />
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <Input
              type="textarea"
              name="text"
              id="description"
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="flex mb-1">
            <EventActions />
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default RightDrawer;
