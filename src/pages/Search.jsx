import toast from "react-hot-toast"
import { Button } from "../../components/ui/button"

const Search = () => {




    const fire = ()=>{
        toast.success('here is a toast')
    }


  return (
    <div>
        <div>
        Search Page

        </div>
        <Button onClick={fire}>
            Test toast
        </Button>
    </div>
  )
}

export default Search
