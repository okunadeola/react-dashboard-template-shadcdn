import { uploadImage } from "../../../utils";
import { Camera, XCircle } from "lucide-react";
import { Fragment, useRef, useState } from "react";

const Cloud = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medias, setMedias] = useState([]);
  const uploadMedias = useRef([]);

  const setMedia = async (e) => {
    e.preventDefault();

    if (e.target.files?.length) {

      for (let i = 0; i < e.target.files.length; i++) {
        const currentFile = e.target.files[i];
        let reader = new FileReader();

        reader.onload = async (e) => {
          setTimeout(async () => {
            setIsLoading(true);
            const res = await uploadImage(e.target?.result);
            setIsLoading(false);
            if (res) {
              console.log(res);
              // const json = {
              //   file: res?.file,
              //   type: res?.type,
              // };
              setMedias([...medias, res]);
              uploadMedias.current.push(res);
            }
          }, 2000);
        };
        reader.readAsDataURL(currentFile);
      }
      setIsLoading(false);
    }
  };

  const removeImage = (index) => {
    uploadMedias.current.splice(index, 1);
    setMedias([...medias.filter((med, i) => i !== index)]);
  };

  return (
    <div>


      <div className="p-3">

            {
                isLoading ?   <div className="w-5 h-5 border-2 border-green-700 rounded-full animate-spin ">

                </div>
                     : (


                    <div className="flex p-3 items-center border w-52 ">
                    <div>
                        <span>Select Files</span>
                    </div>
                    <label className="form-label mb-0  py-1 mx-2 cursor-pointer" htmlFor="file">
                    <span title="pick file">
                        <Camera />
                    </span>
                    <div className="mb-2">
                        
                        <input
                            onChange={(e) => setMedia(e)}
                            name="main"
                            type="file"
                            id="file"
                            accept="*"
                            multiple
                            placeholder="file"
                            className="form-control hidden"
                        />
                    
                    </div>
                    </label>
                    
                    </div>

                )
            }


      </div>

      <div className="flex mb-3">
        {uploadMedias?.current?.map((file, i) => (
          <div
            key={file.file}
            className="mx-2"
            style={{ position: "relative" }}
          >
            {file.type === "image" ? (
              <Fragment>
                <img
                  style={{
                    maxWidth: "120px",
                    position: "relative",
                    borderRadius: "5px",
                  }}
                  className="avatar avatar-xl mr-3 ralative"
                  src={file?.file}
                  alt="avatar"
                />
                <XCircle
                  onClick={() => removeImage(i)}
                  color={"red"}
                  className="absolute "
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -10,
                    zIndex: 10,
                  }}
                />
              </Fragment>
            ) : (
              <span>Ohter type of file UI</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cloud;
