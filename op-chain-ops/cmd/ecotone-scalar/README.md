# ecotone-scalar

A CLI tool for computing the value of `scalar` to use after the Ecotone upgrade in a call to
setGasConfig(scalar, overhead) of the L1 SystemConfig contract. After the Ecotone upgrade, the
overhead parameter is ignored, and the scalar parameter encodes a versioned bytes32 that allows
configuring the base fee scalar and blob base fee scalars separately.

#### Usage

Build and run using the [Makefile](../../Makefile) `ecotone-scalar` target. Run `make
ecotone-scalar` to create a binary in [../../bin/ecotone-scalar](../../bin/ecotone-scalar) that can
be executed, providing the `--scalar` and `--blob-scalar` flags to specify the base bee scalar and
blob base fee parameters respectively, for example:

```sh
./bin/ecotone-scalar --scalar=100 --blob-scalar=680000
```
