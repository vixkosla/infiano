import LogoInfiano from './logo-infiano.png'

export function Logo() {
    return (
        <>
            <div>
                <img src={LogoInfiano}
                    className='h-8 w-auto sm:h-10'
                    alt="" />
            </div>
        </>
    )
}