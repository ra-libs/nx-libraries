create-react-lib:
	npx nx g @nx/react:library ${NAME} --publishable --importPath @ra-libs/${NAME}

lint:
	npx nx format:write
	npx nx affected -t lint --fix

yalc-publish:
	cd dist/packages/react && yalc publish