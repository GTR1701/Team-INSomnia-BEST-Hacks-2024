"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { languageOptions } from "@/constants/languageOptions";
import CodeEditorWindow from "./CodeEditorWindow";
import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useKeyPress from "@/hooks/useKeyPress";
// import { defineTheme } from "@/lib/defineTheme";
import LanguagesDropdown from "./LanguagesDropdown";
import OutputDetails from "./OutputDetails";
import OutputWindow from "./OutputWindow";
import {useRouter} from "next/navigation";

type LandingProps = {
  codeEditorDefault: string;
  codeEditorSolution: string;
  nextLesson: string;
  previousLesson: string;
}

const Landing = ({ codeEditorDefault, codeEditorSolution, nextLesson, previousLesson }: LandingProps) => {
  const [code, setCode] = useState(codeEditorDefault);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState({
    value: "oceanic-next",
    label: "Oceanic Next",
  });
  const [language, setLanguage] = useState(languageOptions[0]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false)

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const themeMUI = useTheme();
  const isMobile = useMediaQuery(themeMUI.breakpoints.up("md"));
  const router = useRouter();

  const handleModalOpen = () => {setModalOpen(true); console.log("modalOpen",modalOpen)};
  const handleModalClose = () => {setModalOpen(false); console.log("modalOpen",modalOpen)};

  const showSuccessToast = (msg: string): void => {
    setSuccessOpen(true);
    setMsg(msg);
  };
  function showErrorToast(msg: any) {
    setErrorOpen(true);
    setMsg(msg);
  };

  const onSelectChange = (
    sl: React.SetStateAction<{
      id: number;
      name: string;
      label: string;
      value: string;
    }>
  ) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  
  const onChange = (action: any, data: React.SetStateAction<string>) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(""),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response: { data: { token: any } }) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err: { response: { data: any; status: any } }) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response ? err.response.status : 500;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token: any) => {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        
        if(atob(response.data.stdout).toString().trim() == codeEditorSolution.toString().trim()){
          handleModalOpen()
          console.log("modalOpen",modalOpen)
        }

        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast(err);
    }
  };

  // function handleThemeChange(th: any) {
  //   const theme = th;
  //   console.log("theme...", theme);

    setTheme({'value': "vs-dark", 'label': "Dark"})
  //   if (["light", "vs-dark"].includes(theme.value)) {
  //     setTheme(theme);
  //   } else {
  //     defineTheme(theme.value).then((_) => setTheme(theme));
  //   }
  // }
  // useEffect(() => {
  //   defineTheme("oceanic-next").then((_) =>
  //     setTheme({ value: "oceanic-next", label: "Oceanic Next" })
  //   );
  // }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Box sx={{ width: "75%" }}>
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                width: "15%", 
                marginLeft: "auto", 
                marginRight: "auto" 
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", }}>
                <Button
                  sx={{ width: "fit-content", margin: "1rem auto" }}
                  variant="contained"
                  onClick={handleCompile}
                  disabled={!code}
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <Box sx={{ marginBottom: "1rem" }}>
                  <LanguagesDropdown onSelectChange={onSelectChange} />
                </Box>
              </Box>
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </Box>
          </Box>
          <OutputWindow outputDetails={outputDetails} />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={2500}
            message={msg || `Compiled Successfully!`}
            key={"bottom" + "left"}
            open={successOpen}
            onClose={handleClose}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={2500}
            message={msg || `Compiled Successfully!`}
            key={"bottom" + "left"}
            open={errorOpen}
            onClose={handleClose}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          </Snackbar>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              width: "40%", 
              height: "50%", 
              zIndex: 1000, 
              backgroundColor: themeMUI.palette.background.paper, 
              margin: "auto",
              borderRadius: "1rem",
            }}
            >
            <Box>
              <Typography sx={{
                height: "fit-content",
                margin: "auto",
                textAlign: "center",
              }} 
              id="modal-modal-title" variant="h2" component="h2">
                Poprawna odpowiedź!
              </Typography>
              <Box sx={{margin: "auto", width: "fit-content"}}>
                <Button
                  sx={{ width: "fit-content", margin: "1rem auto" }}
                  variant="text"
                  onClick={() => router.push(previousLesson)}
                >
                  Poprzednia lekcja
                </Button>
                <Button
                  sx={{ width: "fit-content", margin: "1rem auto" }}
                  variant="text"
                  onClick={handleModalClose}
                >
                  Zamknij
                </Button>
                <Button
                  sx={{ width: "fit-content", margin: "1rem auto" }}
                  variant="text"
                  onClick={() => router.push(nextLesson)}
                >
                  Następna lekcja
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            <Box sx={{ width: "100%" }}>
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  sx={{ width: "fit-content", margin: "1rem auto" }}
                  variant="contained"
                  onClick={handleCompile}
                  disabled={!code}
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "1rem",
                }}
              >
                <Box sx={{ marginBottom: "1rem" }}>
                  <LanguagesDropdown onSelectChange={onSelectChange} />
                </Box>
              </Box>
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </Box>
          </Box>
          <OutputWindow outputDetails={outputDetails} />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={2500}
            message={msg || `Compiled Successfully!`}
            key={"bottom" + "left"}
            open={successOpen}
            onClose={handleClose}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={2500}
            message={msg || `Compiled Successfully!`}
            key={"bottom" + "left"}
            open={errorOpen}
            onClose={handleClose}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {msg}
            </Alert>
          </Snackbar>
          <Modal
            open={true}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40vh", height: "30vh", zIndex: 1000 }}
            >
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Poprawna odpowiedź!
              </Typography>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};
export default Landing;
