{/* <Skeleton
isLoaded={ !isDividendLoading } rounded="xl" minHeight="300px"
sx={ {
  '--fc-border-color': useColorModeValue('rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, .2)'),
  '--fc-button-border-color': useColorModeValue('rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .2)'),
  '--fc-button-hover-border-color': useColorModeValue('rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .2)'),
  '--fc-button-active-border-color': useColorModeValue('rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .2)'),
  '--fc-button-text-color': useColorModeValue('#333', '#fff'),
  '--fc-button-bg-color': 'transparent',
  '--fc-button-hover-bg-color': useColorModeValue('rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, .1)'),
  '--fc-button-active-bg-color': useColorModeValue('rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, .1)'),
  '--fc-neutral-bg-color': useColorModeValue('rgba(0, 0, 0, .05)', 'rgba(255, 255, 255, .05)'),
} }
>
{
  !isDividendLoading && (
    <FullCalendar
      datesSet={ (date) => setDate(date.start) }
      showNonCurrentDates={ false }
      plugins={ [dayGridPlugin] }
      events={ events }
      eventContent={ renderEventContent }
      buttonText={ { today: 'Today' } }
      height={ calenderHeight }
    />
  )
}
</Skeleton>

const renderEventContent = eventInfo => {
const { backgroundColor, textColor, event } = eventInfo;
return (
<>
<Show above="md">
<Box px="2" overflow="hidden" w="full">
<Box
width="min-content" px="3" py="2px" rounded="full" bg={ backgroundColor } color={ textColor }
textOverflow="ellipsis" whiteSpace="nowrap" fontSize="xs"
>
{ event.title }
</Box>
</Box>
</Show>
<Show below="md">
<Box px="2" overflow="hidden" w="full">
<Box
rounded="full" bg={ backgroundColor } color={ textColor } px="2" py="1px" fontSize="xs" width="min-content"
>
{ event.title[0] }
</Box>
</Box>
</Show>
</>
)
}; */}