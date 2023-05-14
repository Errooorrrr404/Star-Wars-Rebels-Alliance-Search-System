import { Card, CircularProgress } from '@mui/material'

function Loader () {
  return (
        <Card style={{ padding: 16, width: 'fit-content', display: 'block', margin: 'auto' }}>
            <CircularProgress/>
        </Card>
  )
}

export default Loader
