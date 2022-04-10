import { Box, Container, Stack, TextField } from "@mui/material";
import React, {useEffect, useState} from "react";

interface Compound {
  amountInvested: number,
  apyRate: number,
  period: number,
  duration: number
}

const CompoundPage = () => {
  const [ compoundForm, setCompoundForm ] = useState<Compound>({ amountInvested: 1000, apyRate: 10, period: 365, duration: 365 })
  const [ compoundValue, setCompoundValue ] = useState<number>(0)

  const calculate = (amountInvested: number, apyRate: number, period: number, duration: number) => {

    return amountInvested * Math.pow(1 + (apyRate/100/period), (period * (duration / 365)));
  }

  const handleOnChange = (event: any, formField: any) => {
    setCompoundForm({
      ...compoundForm,
      [formField]: event.target.value
    })

    setCompoundValue(calculate(compoundForm.amountInvested, compoundForm.apyRate, compoundForm.period, compoundForm.duration))
  }

  useEffect(() => {
    setCompoundValue(calculate(compoundForm.amountInvested, compoundForm.apyRate, compoundForm.period, compoundForm.duration))
  }, [compoundForm.amountInvested, compoundForm.apyRate, compoundForm.period, compoundForm.duration])

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Container maxWidth="sm">
          <Stack spacing={2}>
            <p>
              This is a Compound Interest calculator so you can simulate how much you will earn over a period of time.
            </p>
            <TextField
              label="Amount Invested"
              variant="outlined"
              defaultValue={ compoundForm.amountInvested }
              onChange={ (event: any) => handleOnChange(event, 'amountInvested') }
            />
            <TextField
              id="outlined-basic"
              label="APY"
              variant="outlined"
              defaultValue={ compoundForm.apyRate }
              onChange={ (event: any) => handleOnChange(event, 'apyRate') }
            />
            <TextField
              id="outlined-basic"
              label="Period"
              variant="outlined"
              defaultValue={ compoundForm.period }
              onChange={ (event: any) => handleOnChange(event, 'period') }
            />
            <TextField
              id="outlined-basic"
              label="Duration in Days"
              variant="outlined"
              defaultValue={ compoundForm.duration }
              onChange={ (event: any) => handleOnChange(event, 'duration') }
            />
            <div>
              At the end of the duration you will have { compoundValue }
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default CompoundPage
