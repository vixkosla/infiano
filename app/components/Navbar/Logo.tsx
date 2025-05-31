import LogoInfiano from './logo-infiano.png'

export function Logo() {
    return (
        <>
            <div>
                <a href='https://infiano.ai' target="_blank">
                    <img src={LogoInfiano}
                        className='h-8 w-auto sm:h-10'
                        alt="" />
                </a>
            </div>
        </>
    )
}