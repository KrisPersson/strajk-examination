import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { setupServer } from 'msw/node'
import { http, HttpResponse } from "msw"
import App from "./App"

const server = setupServer(
    http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', () => {
        return HttpResponse.json({
            active: true,
            id: "TESTID",
            lanes: "1",
            people: "2",
            shoes: ["43", "40"],
            when: '2023-12-14T1200',
            price: "220"
        })
    })
)


beforeAll(() => server.listen())
afterAll(() => server.close())


describe('App', () => {


    it('should render a unique input for Date, Time, Amt of players, and Amt of lanes', () => {
        render(<App />)

        const dateInput = screen.getByRole('when')
        const timeInput = screen.getByRole('time')
        const amtPlayersInput = screen.getByRole('people')
        const amtLanesInput = screen.getByRole('lanes')

        expect(dateInput).toBeInTheDocument()
        expect(timeInput).toBeInTheDocument()
        expect(amtPlayersInput).toBeInTheDocument()
        expect(amtLanesInput).toBeInTheDocument()
    })

    it('should render a button that adds a shoe-size input when clicked', async () => {
        render(<App />)

        const addShoesBtn = screen.getByRole('add-shoes-btn')
        expect(addShoesBtn).toBeInTheDocument()

        fireEvent.click(addShoesBtn)
        await waitFor(() => {
            expect(screen.getByRole('shoe-size-input')).toBeInTheDocument()
        })
        const shoeSizeInputs = screen.getAllByRole('shoe-size-input')
        expect(shoeSizeInputs).toHaveLength(1)
        
    })

    it('should render a button for each shoe-size-input that removes said input when clicked', async () => {
        render(<App />)

        const addShoesBtn = screen.getByRole('add-shoes-btn')

        fireEvent.click(addShoesBtn)
        await waitFor(() => {
            expect(screen.getByRole('shoe-size-input')).toBeInTheDocument()
        })
        const shoeSizeInputs = screen.getAllByRole('shoe-size-input')
        const shoeSizeRemoveBtns = screen.getAllByRole('remove-shoe-input')
        expect(shoeSizeInputs).toHaveLength(shoeSizeRemoveBtns.length)
        expect(shoeSizeInputs).toHaveLength(1)

        const removeShoesBtn = screen.getByRole('remove-shoe-input')
        fireEvent.click(removeShoesBtn)
       
        expect(screen.queryAllByRole('shoe-size-input')).toHaveLength(0)
    })

    it('should successfully fill out the form, place an order, and navigate to the Confirmation-view', async () => {
        render(<App />)
        // Selecting elements
        const dateInput = screen.getByRole('when')
        const timeInput = screen.getByRole('time')
        const amtPlayersInput = screen.getByRole('people')
        const amtLanesInput = screen.getByRole('lanes')

        const addShoesBtn = screen.getByRole('add-shoes-btn')
        const placeOrderBtn = screen.getByRole('place-order-btn')

        // Filling out the form and placing order
        fireEvent.change(dateInput, { target: { value: '2023-12-07' } })
        fireEvent.change(timeInput, { target: { value: '19.00' } })
        fireEvent.change(amtPlayersInput, { target: { value: 2 } })
        fireEvent.change(amtLanesInput, { target: { value: 1 } })

        fireEvent.click(addShoesBtn)
        fireEvent.click(addShoesBtn)
        const shoeSizeInputs = screen.queryAllByRole('shoe-size-input')
        
        fireEvent.change(shoeSizeInputs[0], { target: { value: 40 } })
        fireEvent.change(shoeSizeInputs[1], { target: { value: 43 } })
        fireEvent.click(placeOrderBtn)

        // Testing that confirmation-view renders as expected

        await waitFor(() => {
            expect(screen.getByRole('confirmation-view')).toBeInTheDocument()
        })

        const when = screen.getByRole('confirmation-when').value
        expect(when).toBe('2023-12-14 1200')
        const who = screen.getByRole('confirmation-who').value
        expect(who).toBe('2')
        const lanes = screen.getByRole('confirmation-lanes').value
        expect(lanes).toBe('1')
        const bookingNr = screen.getByRole('confirmation-booking-nr').value
        expect(bookingNr).toBe('TESTID')
        const totalPrice = screen.getByRole('total-price')
        expect(totalPrice.textContent).toBe("220 sek")

        const confirmBtn = screen.getByRole('sweet-lets-go-btn')
        fireEvent.click(confirmBtn)

        const noBookingElem = screen.getByRole('no-booking-made')
        expect(noBookingElem).toBeInTheDocument()
        
    })

})