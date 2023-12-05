import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { setupServer } from 'msw/node'
import { http, HttpResponse } from "msw"
import App from "./App"

const server = setupServer(
    http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', () => {
        return HttpResponse.json({
           success: true,
           message: "Booking successful! (TEST)"
        })
    })
)


beforeAll(() => {
    server.listen()
})
afterAll(() => server.close())


describe('App', () => {


    it('should render a different input for Date, Time, Amt of players, and Amt of lanes', async () => {
        render(<App />)

        // await waitFor(() => {
        //     expect(screen.queryByText('No movies found')).not.toBeInTheDocument()
        // })

        const dateInput = screen.getByLabelText('Date')
        const timeInput = screen.getByLabelText('Time')
        const amtPlayersInput = screen.getByLabelText('Number of awesome bowlers')
        const amtLanesInput = screen.getByLabelText('Number of lanes')

        expect(dateInput).toBeTruthy()
        expect(timeInput).toBeTruthy()
        expect(amtPlayersInput).toBeTruthy()
        expect(amtLanesInput).toBeTruthy()
    })

})