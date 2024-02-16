import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";







const Home = () => {
    const [opened, {open, close}] = useDisclosure(false)



    return ( 
        <>
            Home page

            <div>
                <div>Mantine UI Component</div>
                <div>
                <>
                    <Modal opened={opened} onClose={close} title="Authentication" centered>
                        {/* Modal content */}
                        <div>
                            <span>
                                hello Mantine modal!
                            </span>
                        </div>
                    </Modal>

                    <Button onClick={open}>Open centered Modal</Button>
                </>
                </div>
            </div>
        </>
     );
}
 
export default Home;