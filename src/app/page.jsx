'use client'
import {Button} from "@nextui-org/react";

async function ngspice() {
  const res = await fetch ('/api', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  console.log(await res.json());

}

export default function Page() {
  return (
      <Button onPress={() => ngspice()}>Press me</Button>
  )
}