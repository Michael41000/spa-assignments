let addNumber = 1

$("#document").ready(
    () => {
        const addButton = $("#addButton")
        const total = $("#totalText")
        const multiplyButton = $("#multiplyButton")
        const autoClickerButton = $("#autoClickerButton")
        const numAutoClickers = $("#numAutoClickers")
        const resetButton = $("#resetButton")
        const saveButton = $("#saveButton")
        let intervals = []
        let addNumber
        let autoClickerNumber
        let totalNumber
        const enable = (buttonToEnable) => {
            buttonToEnable.css("background-color", "white")
            buttonToEnable.prop("disabled", false)
        }
        const disable = (buttonToDisenable) => {
            buttonToDisenable.css("background-color", "grey")
            buttonToDisenable.prop("disabled", true)
        }
        const add = (number) => {
            setTotalNumber(totalNumber + addNumber)
            if (totalNumber >= 10)
            {
                enable(multiplyButton)
            }
            if (totalNumber >= 100)
            {
                enable(autoClickerButton)
            }
        }
        const subtract = (number) => {
            setTotalNumber(totalNumber - number)
            if (totalNumber < 10)
            {
                disable(multiplyButton)
            }
            if (totalNumber < 100)
            {
                disable(autoClickerButton)
            }
        }
        const setAutoClickerNumber = (number) => {
            autoClickerNumber = number
            numAutoClickers.text("AutoClickers: " + autoClickerNumber)
        }
        const setAddNumber = (number) => {
            addNumber = number
            addButton.text("+" + Number(addNumber.toPrecision(5)))
        }
        const setTotalNumber = (number) => {
            totalNumber = number;
            total.text("Total: " + Number(totalNumber.toFixed(5)))
        }
        const setCookie = (cname, cvalue, exdays) => {
            const d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            const expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        const getCookie = (cname) => {
            const name = cname + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        const checkCookie = (cname) => {
            const cookie = getCookie(cname);
            if (cookie != "") {
                return true;
            } else {
                return false;
            }
        }
        const deleteCookies = () => {
            document.cookie = "total=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "add=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "autoClickers=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        const setup = () => { 
            setTotalNumber(checkCookie("total") ? Number(getCookie("total")) : 0)
            setAutoClickerNumber(checkCookie("autoClickers") ? Number(getCookie("autoClickers")) : 0)
            setAddNumber(checkCookie("add") ? Number(getCookie("add")) : 1)
            if (totalNumber < 10)
            {
                disable(multiplyButton)
            }
            if (totalNumber < 100)
            {
                disable(autoClickerButton)
            }
            if (totalNumber === 0 && autoClickerNumber === 0 && addNumber === 1)
            {
                disable(resetButton)
            }
            for (let i = 0; i < autoClickerNumber; i++)
            {
                setTimeout(() => {
                    intervals.push(setInterval(() => {
                        addButton.click()
                    }, 1000))
                }, Math.random() * 1000);
            }
            setInterval(() => {
                saveButton.click()
            }, 60 * 1000)
        }
        
        setup()
        
        addButton.click( 
            (event) => {
                add(addNumber)
                enable(resetButton)
            })
        multiplyButton.click(
            (event) => {
                subtract(10)
                setAddNumber(addNumber * 1.2)
            })
        autoClickerButton.click(
            (event) => {
                subtract(100)
                setAutoClickerNumber(autoClickerNumber + 1)
                intervals.push(setInterval(() => {
                    addButton.click()
                }, 1000))
            })
        resetButton.click(
            (event) => {
                const intervalLength = intervals.length
                for (let i = 1; i <= intervalLength; i++)
                {
                    clearInterval(intervals.pop())
                }
                setAutoClickerNumber(0)
                setTotalNumber(0)
                setAddNumber(1)
                disable(multiplyButton)
                disable(autoClickerButton)
                disable(resetButton)
                deleteCookies()
            })
        saveButton.click(
            (event) => {
                setCookie("total", totalNumber)
                setCookie("autoClickers", autoClickerNumber)
                setCookie("add", addNumber)
            }
        )
    })