create-react-lib:
	npx nx g @nx/react:library ${NAME} --publishable --importPath @ra-libs/${NAME}

yalc-publish:
	cd dist/packages/react && yalc publish