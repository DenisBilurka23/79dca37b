import {Box, styled} from '@mui/material'

const LoaderContainer = styled(Box)`
  z-index: 100;
  width: 48px;
  height: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const RotatingLoader = styled(Box)`
  width: 100%;
  height: 100%;
  border: 5px solid var(--green);
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader = () => (
	<LoaderContainer>
		<RotatingLoader/>
	</LoaderContainer>
)

export default Loader
